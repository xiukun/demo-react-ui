import React from 'react'
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd'
import './index.less'
interface ButtonProps extends AntdButtonProps {
	children: React.ReactNode
}
const Button: React.FC<ButtonProps> = (props) => {
	const { children, ...rest } = props
	return <AntdButton {...rest}>{children}</AntdButton>
}
export default Button
