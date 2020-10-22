// Libraries
import * as React from 'react';

// Style
import './style.styl'

interface IProps {
  children?: any
}

const ModuleTitle = ({ children }: IProps) => {
  return (
    <div className="g-module-title">
      {children}
    </div>
  )
}

const defaultProps: IProps = {

}

ModuleTitle.defaultProps = defaultProps;

export default ModuleTitle;