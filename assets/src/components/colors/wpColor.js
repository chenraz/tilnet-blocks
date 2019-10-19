
/**
 * Externals
 */
import { isUndefined, defaultTo } from 'lodash';
import classNames from 'classnames/dedupe';

const { createHigherOrderComponent } = wp.compose;
const {
	withColors:wpWithColors,
} = wp.blockEditor;
const { 
	useEffect,
	useReducer
} = wp.element;


const useWpColors = (colorsContext,props) => {
	
	const {attributes,setAttributes} = props;
	const {className: attrClassName} = attributes;

	const reducer = (classes,{attr,newClassName}) => {

		console.log ('useWpColors reducer  begin',classes,attr,newClassName);
		
		const className = defaultTo(classes[attr],'');

		console.log ('useWpColors reducer  got className: ', className);

		if (className != newClassName) {


		console.log ('useWpColors reducer  change className to: ', newClassName);

			setAttributes({
				className: classNames(
					attrClassName,
					{[className]: false},
					{[newClassName]: true}
				)
			});
		}

		console.log ('useWpColors reducer  returns:',{
			...classes,
			[attr]:newClassName
		});
		
		return {
			...classes,
			[attr]:newClassName
		};

	}	

	const [classes, setClasses] = useReducer(reducer,{});

	useEffect (()=>{

		console.log ('useWpColors effect:',props,colorsContext);

		for (const colorContext of colorsContext) {

			const currentClasss = isUndefined(props[colorContext])
				?	''
				:	defaultTo(props[colorContext].class,'');

			const stateClasss = defaultTo(classes[colorContext],'');

			console.log ('useWpColors effect classes:',currentClasss,stateClasss);


			if (currentClasss != stateClasss) {
				
				console.log (`useWpColors effect change from ${stateClasss} to ${currentClasss}:`);
				console.log ('useWpColors effect change classes:',currentClasss,stateClasss);
				
				setClasses({
					attr: colorContext,
					newClassName: currentClasss
				});
			}			

			console.log ('useWpColor useEffect ', stateClasss);

		}
	});


}

export default (...colorsContext) => createHigherOrderComponent(
	(WrappedComponent) => (
		wpWithColors(...colorsContext) (props => {
			console.log ('withWpColors props: ',props);
			useWpColors(colorsContext,props);
			return <WrappedComponent {...props} />
		})
	),
	'withWpColors'
)
