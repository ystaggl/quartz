---
title: A Better Remote Desktop Experience
draft: false
tags:
---

<!-- text goes here -->
Recently I have been using Remote Desktop for work, and it's managed to frustrate me quite a bit. When the window is in full screen, I can't easily access the other programs on that monitor. Alternatively I can have it windowed, which works but doesn't properly fit my screen. I wanted a better solution, so I wrote one.

# The Result
As you can see, the remote desktop window fills my screen completely, stacking on top of my taskbar, giving me complete and easy access to both the windows in the remote desktop window as well as on my local computer.![[Pasted image 20250317145434.png]]

# The Solution
To get this result, we can use the Windows API. I'll be using python for this post but the same thing can be implemented in your language of choice by calling the same winapi functions. I'll start by posting the finished script, and then explain it

```python
import win32gui, win32con #From PyWin32 library. https://pypi.org/project/pywin32/
import subprocess
import time

#Main Configuration variables

REMOTE_DESKTOP_PROFILE = r'PATH\TO\RDP\PROFILE'
LEFT_OFFSET = 1920 #Distance from left of leftmost monitor to RDP window
RDP_WAIT = 7 #How long to wait for RDP to start

#Only touch these if you know what you're doing
TARGET_CLASS = 'TscShellContainerClass' #Class name of RDP Window

STYLE_MOD = -(win32con.WS_CAPTION + win32con.WS_SYSMENU + win32con.WS_BORDER + win32con.WS_SIZEBOX) #Style flags corresponding to window border

#Tells SetWindowPos to only change position and then apply changes to window styles
uFlags = win32con.SWP_NOSIZE | win32con.SWP_NOZORDER | win32con.SWP_FRAMECHANGED 



#Start Remote Desktop
subprocess.Popen(['mstsc',REMOTE_DESKTOP_PROFILE]) 

#Wait for Remote Desktop window to load
print(f"Waiting {RDP_WAIT} seconds for Remote Desktop to load")
for i in range(RDP_WAIT):
	print(f"\r{RDP_WAIT-i}", end="  ") 
	print("\r", end=" ")
	time.sleep(1)

#Find Remote Desktop Window, Set style and position
hwnd = win32gui.FindWindow(TARGET_CLASS,None) 

style = win32gui.GetWindowLong(hwnd,win32con.GWL_STYLE)
style += STYLE_MOD
win32gui.SetWindowLong(hwnd,win32con.GWL_STYLE,style)

win32gui.SetWindowPos(hwnd,None,LEFT_OFFSET,0,0,0,uFlags)
```

The main values you'll want to change are 
<span class="code-variable">LEFT_OFFSET</span> which defines how far from the leftmost position of your left monitor the window is positioned
<span class="code-variable">RDP_WAIT</span>, the delay (in seconds) to wait for the RDP window to load, and
<span class="code-variable">REMOTE_DESKTOP_PROFILE</span> the path to your remote desktop profile
# Remote Desktop Profile
The second thing you'll need to make this fix work is a Remote Desktop Profile file, as remote desktop windows will only use the resolution given to them by the launcher or their profile. This can easily be made from the Remote Desktop connection window, ensure the settings for your connection are correct, and save it
![[Pasted image 20250317145113.png]]

You will then need to open it as a text file, and modify the Line `desktopheight:i:XXXX`, to match the amount of pixels from the top of your screen to your taskbar, in my case 1140 on a 1920x1200 display.

# The Explanation
Well, this script is actually very short, but it makes a good introduction to using the windows api. 

```python
hwnd = win32gui.FindWindow(TARGET_CLASS,None) 

style = win32gui.GetWindowLong(hwnd,win32con.GWL_STYLE)
style += STYLE_MOD
win32gui.SetWindowLong(hwnd,win32con.GWL_STYLE,style)

win32gui.SetWindowPos(hwnd,None,LEFT_OFFSET,0,0,0,uFlags)
```

<span class="code-variable">TARGET_CLASS</span> is the class name of a window, in this case the RDP window. This is an identifier that can be used to find the same window across multiple sessions or even when the exe filename is changed. They aren't absolutely bulletproof, especially when there are multiple instances of the same window, but for my purposes with this script they're more than enough. Personally, I usually find these using the AutoHotKey window spy.

[FindWindow](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowa) then gets us a hWnd window handle from the class, this is a truly unique identifier for a specific instance of a window, meaning it changes every time the window is reopened, but this value is necessary for targeting the upcoming function calls

[GetWindowLong](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowlongptra) then gets us a long integer representing the sum of the [Window Style Flags](https://learn.microsoft.com/en-us/windows/win32/winmsg/window-styles) of our window. These are constant values that control the way a window appears, tracking things like whether it has a border, a scrollbar or is minimized. We can manipulate the windows appearance by adding or subtracting these flags from the windows' style integer to activate or deactivate them. For example a window with no styles at all might look something like 0x00000000, by adding the flag for a Border, 0x00800000, to this value, we'd be adding a border to the window. If we then add 0x01000000, we'd get 0x01800000, meaning a maximized window with border.

Of course simply increasing our style value will not mutate our window directly, we need to apply our new modified style value to our window, for this we use [SetWindowLong](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowlongptra), which I hope at this point is rather self-explanatory.

Finally, I modify the windows position using [SetWindowPos](https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowpos), this applies the window style flags, as well as repositions the window exactly at the start of my right monitor, creating a borderless fullscreen window stacked on my taskbar. We use 0 for the width and height as we aren't changing them  I've included them with a value set to 0, to make it easier to understand how the function works, but you can replace them with 0 if you want.