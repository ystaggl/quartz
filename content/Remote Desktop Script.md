---
title: A Better Remote Desktop
draft: false
tags:
  - Programming
  - Windows-Enhancements
---
Recently I have been using Remote Desktop for work, and it's managed to frustrate me quite a bit. When the window is in full screen, I can't easily access the other programs on that monitor. Alternatively I can have it windowed, which works but doesn't properly fit my screen. I wanted a better solution, so I wrote one.

# The Result
As you can see, the remote desktop window fills my screen completely, stacking on top of my taskbar, giving me complete and easy access to both the windows in the remote desktop window as well as on my local computer.![[Pasted image 20250317145434.png]]

# The Solution
To get this result, we can use the Windows API. I'll be using python for this post but the same thing can be implemented in your language of choice by calling the same winapi functions. I'll start by posting the finished script, and then explain it

```python
import win32gui, win32con
import subprocess

# ===Configuration===

LEFT_OFFSET = 1920 # Width of left monitor in my case.
REMOTE_DESKTOP_PROFILE = r'C:\PATH\TO\profile.rdp'

# Class name of RDP Window
TARGET_CLASS =  'TscShellContainerClass'
# These flags will be added (removed) from the window
STYLE_MOD = win32con.WS_CAPTION | win32con.WS_SYSMENU | win32con.WS_BORDER | win32con.WS_SIZEBOX
# Only change position and apply changes to window styles
POS_FLAGS = win32con.SWP_NOSIZE | win32con.SWP_NOZORDER | win32con.SWP_FRAMECHANGED


# ===Execution===

subprocess.Popen(['mstsc',REMOTE_DESKTOP_PROFILE]) #Start Remote Desktop

# Get style until the RPD window loads
style = 0
while style != 0x16cf0100:
    hWnd = win32gui.FindWindow(TARGET_CLASS,None)
    style = win32gui.GetWindowLong(hWnd,win32con.GWL_STYLE)

style -= STYLE_MOD #Remove the flags responsible for the border

win32gui.SetWindowLong(hWnd,win32con.GWL_STYLE,style)
win32gui.SetWindowPos(hWnd,None,LEFT_OFFSET,0,0,0,POS_FLAGS)
```

The main values you'll want to change are 
<span class="code-variable">LEFT_OFFSET</span> which defines how far from the leftmost position of your left monitor the window is positioned and
<span class="code-variable">REMOTE_DESKTOP_PROFILE</span> the path to your remote desktop profile
# Remote Desktop Profile
The second thing you'll need to make this fix work is a Remote Desktop Profile file, as remote desktop windows will only use the resolution given to them by the launcher or their profile. This can easily be made from the Remote Desktop connection window, ensure the settings for your connection are correct, and save it
![[Pasted image 20250317145113.png]]

You will then need to open it as a text file, and modify the Line `desktopheight:i:XXXX`, to match the amount of pixels from the top of your screen to your taskbar, in my case 1140 on a 1920x1200 display.

# The Explanation
Well, this script is actually very short, but it makes a good introduction to using the windows api. 

```python
while style != 0x16cf0100:
    hWnd = win32gui.FindWindow(TARGET_CLASS,None)
    style = win32gui.GetWindowLong(hWnd,win32con.GWL_STYLE)

style -= STYLE_MOD #Remove the flags responsible for the border

win32gui.SetWindowLong(hWnd,win32con.GWL_STYLE,style)
win32gui.SetWindowPos(hWnd,None,LEFT_OFFSET,0,0,0,POS_FLAGS)
```

<span class="code-variable">TARGET_CLASS</span> is the class name of a window, in this case the RDP window. This is an identifier that can be used to find the same window across multiple sessions or even when the exe filename is changed. They aren't absolutely bulletproof, especially when there are multiple instances of the same window, but for my purposes with this script they're more than enough. Personally, I usually find these using the AutoHotKey window spy.

[FindWindow](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowa) then gets us a hWnd window handle from the class, this is a truly unique identifier for a specific instance of a window, meaning it changes every time the window is reopened, but this value is necessary for targeting the upcoming function calls

[GetWindowLong](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowlongptra) then gets us a long integer representing the sum of the [Window Style Flags](https://learn.microsoft.com/en-us/windows/win32/winmsg/window-styles) of our window. These are constant values that control the way a window appears, tracking things like whether it has a border, a scrollbar or is minimized. We can manipulate the windows appearance by adding or subtracting these flags from the windows' style integer to activate or deactivate them. For example a window with no styles at all might look something like 0x00000000, by adding the flag for a Border, 0x00800000, to this value, we'd be adding a border to the window. If we then add 0x01000000, we'd get 0x01800000, meaning a maximized window with border.

As RDP takes a while to load, I'm simply going to keep getting these values until the style matches what it would be for a loaded window. This is of course a magic number which we want to avoid, but the alternative would be waiting pre-set amount of time, so I like this better. If the script hangs for you, try replacing the while statement with a short pause.

Once our window has loaded, we need to modify the style flags. For this we remove the relevant flags with integer subtraction, and then call [SetWindowLong](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowlongptra) to set our changes.

One quirk of the Windows API is that even after setting the new style flags, our changes won't actually take effect until we call [SetWindowPos](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowpos). This applies the window style flags, and in our case also repositions the window exactly at the start of my right monitor, creating a borderless fullscreen window stacked on my taskbar. The LEFT_OFFSET places it on my right monitor, and the POS_FLAGS variable tells it to only change its position, not size or whether it's above other windows, and to reload its new styles. And that's that, at this point the RDP window should be elegantly stacked on top of your taskbar.