import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import ResizeDetector from 'react-resize-detector'

import './border.css'

const CLASS_NAME = 'react-border'

const Border = ({ children, className, radius, size, stroke, strokeDasharray }) => {
  const svgRef = useRef()
  const rectRef = useRef()

  console.log(size)

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

    if (className === CLASS_NAME){
      style.stroke = stroke
      style['stroke-dasharray'] = strokeDasharray
    }

    return (
      <g className={`${className}__border`} style={style}>
        <rect ref={rectRef} rx={radius} x={size/2} y={size/2} style={style}/>
      </g>
    )
  } 

  const renderBackground = () => {
    const style = {
      pointerEvents: 'none',
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
  size: PropTypes.number,
  stroke: PropTypes.string,  
  strokeDasharray: PropTypes.string,    
}

Border.defaultProps = {
  className: CLASS_NAME,
  radius: 5,
  size: 4,
  stroke: '#363636',  
  strokeDasharray: '5 10',
}

export default Border
