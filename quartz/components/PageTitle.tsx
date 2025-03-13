import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      
      <a href={baseDir}>
        <svg id="favicon" viewBox="0 0 211 300">
          <polygon fill="#b2b0bf" points="69.0,180.48849427774746 96.5,132.85709706960336 114.0,163.1679862020587 86.5,210.79938341020284"></polygon>
          <polygon fill="#b2b0bf" points="0,300 35,300 77.5,226.38784067832273 60.0,196.07695154586736"></polygon>
          <polygon fill="#b2b0bf" points="53,300 193,300 123.0,178.7564434701786"></polygon>
        </svg>
        {title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  margin-left: 20px;
}
svg#favicon {
  width: 32px;
  margin-bottom: 0
}
`
export default (() => PageTitle) satisfies QuartzComponentConstructor
