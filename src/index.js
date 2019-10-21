import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import ResizeDetector from 'react-resize-detector'

import './border.css'

const Border = ({ children, radius, stroke, strokeWidth, strokeDasharray }) => {
  const svgRef = useRef()
  const rectRef = useRef()
  return (
    <div className='react-border'>
      <ResizeDetector
        handleWidth
        handleHeight
        render={({ width, height }) => {
          if (svgRef.current && rectRef.current){
            svgRef.current.setAttribute('width', `${width}px`)
            svgRef.current.setAttribute('height', `${height}px`)
            rectRef.current.setAttribute('width', `${width - strokeWidth}px`)
            rectRef.current.setAttribute('height', `${height - strokeWidth}px`)
          }

          const style = {
            fill: 'none',
            stroke,
            'stroke-width': strokeWidth,
            'stroke-dasharray': strokeDasharray
          }

          return (
           <Fragment>
              {children}
              <svg className='react-border__in' ref={svgRef}>
                <g className='react-border__stroke' style={style}>
                  <rect ref={rectRef} rx={radius} x={strokeWidth/2} y={strokeWidth/2} style={{fill: 'none'}}/>
                </g>
              </svg>
           </Fragment>
          )
        }}
      />
    </div>
  )
}

Border.propTypes = {
  children: PropTypes.node.isRequired,
  radius: PropTypes.number,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  strokeDasharray: PropTypes.string,    
}

export default Border
