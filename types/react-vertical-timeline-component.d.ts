declare module 'react-vertical-timeline-component' {
  import { ReactNode, CSSProperties } from 'react'

  export interface VerticalTimelineProps {
    children?: ReactNode
    className?: string
    animate?: boolean
    layout?: '1-column-left' | '1-column-right' | '2-columns'
  }

  export interface VerticalTimelineElementProps {
    children?: ReactNode
    className?: string
    date?: string
    dateClassName?: string
    icon?: ReactNode
    iconClassName?: string
    iconOnClick?: () => void
    iconStyle?: CSSProperties
    id?: string
    position?: 'left' | 'right'
    style?: CSSProperties
    textClassName?: string
    contentStyle?: CSSProperties
    contentArrowStyle?: CSSProperties
    intersectionObserverProps?: IntersectionObserverInit
    visible?: boolean
  }

  export const VerticalTimeline: React.FC<VerticalTimelineProps>
  export const VerticalTimelineElement: React.FC<VerticalTimelineElementProps>
} 