import React, { Fragment, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import ResizeDetector from 'react-resize-detector'

import './border.css'

const CLASS_NAME_DEFAULT = 'react-border'

const Border = ({ children, className, radius, size }) => {
  const svgRef = useRef()
  const rectRef = useRef()

  const elementClassName = useCallback((postfix) => {
    const classes = [`${CLASS_NAME_DEFAULT}${postfix}`]
    if (className) classes.push(`${className}${postfix}`)
    return classes.join(' ')
  }, [className])

  const update = (width, height) => {
    if (!svgRef.current || !rectRef.current) return

    svgRef.current.setAttribute('width', `${width}px`)
    svgRef.current.setAttribute('height', `${height}px`)
    rectRef.current.setAttribute('width', `${width - size}px`)
    rectRef.current.setAttribute('height', `${height - size}px`)
  }

  const renderBorder = () => {
    const style = {
      fill: 'none',
      strokeWidth: size,
    }

    return (
      <g className={elementClassName('__in')} style={style}>
        <rect ref={rectRef} rx={radius} x={size/2} y={size/2} style={style}/>
      </g>
    )
  } 

  const renderBackground = () => (
    <svg className={elementClassName('__bg')} ref={svgRef}>
      {renderBorder()}
    </svg>
  )

  return (
    <div className={elementClassName('')}>
      <ResizeDetector
        handleWidth
        handleHeight
        render={({ width, height }) => {
          update(width, height)
          return (
           <Fragment>
              {children}
              {renderBackground()}
           </Fragment>
          )
        }}
      />
    </div>
  )
}

Border.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  radius: PropTypes.number,
  size: PropTypes.number,
}

Border.defaultProps = {
  className: '',
  radius: 5,
  size: 4,
}

export default Border
