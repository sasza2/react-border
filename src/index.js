import React, { Fragment, useRef } from 'react'
import PropTypes from 'prop-types'
import ResizeDetector from 'react-resize-detector'

const Border = ({ children }) => {
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
            rectRef.current.setAttribute('width', `${width - 4}px`)
            rectRef.current.setAttribute('height', `${height - 4}px`)
          }
          return (
           <Fragment>
              {children}
              <svg className='react-border__stroke' ref={svgRef}>
                <g style={{ stroke: '#009900', 'stroke-width': 4, 'stroke-dasharray': '10 5', fill: 'none'}}>
                  <rect ref={rectRef} rx="4" x="2" y="2" style={{fill: 'none'}}/>
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
}

export default Border
