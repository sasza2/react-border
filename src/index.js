import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import ResizeDetector from 'react-resize-detector'

import './border.css'

const CLASS_NAME = 'react-border'

const Border = ({ children, className, radius, stroke, strokeWidth, strokeDasharray }) => {
  const svgRef = useRef()
  const rectRef = useRef()

  const update = (width, height) => {
    if (!svgRef.current || !rectRef.current) return

    svgRef.current.setAttribute('width', `${width}px`)
    svgRef.current.setAttribute('height', `${height}px`)
    rectRef.current.setAttribute('width', `${width - strokeWidth}px`)
    rectRef.current.setAttribute('height', `${height - strokeWidth}px`)
  }

  const renderBorder = () => {
    const style = {
      fill: 'none',      
    }

    if (className === CLASS_NAME){
      style.stroke = stroke
      style['stroke-width'] = strokeWidth
      style['stroke-dasharray'] = strokeDasharray
    }

    return (
      <g className={`${className}__border`} style={style}>
        <rect ref={rectRef} rx={radius} x={strokeWidth/2} y={strokeWidth/2} style={style}/>
      </g>
    )
  } 

  const renderBackground = () => {
    const style = {
      'pointer-events': 'none',
    }
    return (
      <svg className={`${className}__bg`} ref={svgRef} style={style}>
        {renderBorder()}
      </svg>
    )
  }

  return (
    <div className={className}>
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
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,    
}

Border.defaultTypes = {
  className: CLASS_NAME,
}

export default Border
