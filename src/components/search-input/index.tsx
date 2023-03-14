import React from 'react'
import classes from './index.module.less'
import IconSearch from '@/assets/svg/search.svg'
interface SearchInputProps {
	defaultValue?: string
	placeholder?: string
	onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchInput: React.FC<SearchInputProps> = (props) => {
	const { defaultValue, placeholder, onChange } = props
	const inputOnChange: React.ChangeEventHandler<HTMLInputElement> = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (onChange) {
			onChange(e.target.value, e)
		}
	}
	return (
		<div className={classes.searchInputWrap}>
			{/* 存放icon */}
			<div className={classes.searchInputIconBox}>
				<IconSearch width={18} height={18} />
			</div>
			{/* 输入框 */}
			<input
				className={classes.searchInput}
				defaultValue={defaultValue}
				placeholder={placeholder}
				onChange={inputOnChange}
			></input>
		</div>
	)
}

export { SearchInput, SearchInputProps }
