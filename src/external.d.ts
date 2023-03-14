// tsconfig.json中 "noEmit": true表明由ts进行类型检查，但是不编译文件。
// tsconfig.json中 include中的./src/external.d.ts中的内容如下

// less模块声明
declare module '*.module.less' {
	const content: { [className: string]: string }
	export = content
}

// svg类型
declare module '*.svg' {
	const content: React.FunctionComponent<
		React.SVGAttributes<React.ReactSVGElement>
	>
	export default content
}
