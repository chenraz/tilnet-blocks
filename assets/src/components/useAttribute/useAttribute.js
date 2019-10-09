/**
 * Externals
 */
import {useEffect,useState} from 'react';
import {isEqual,isUndefined} from 'lodash';
import classNames from 'classnames/dedupe';

/**
 * 
 * @param {*} attrObj 
 * @param {*} props 
 */
const useAttributeClass = (attrObj,props) => {

    const {attrName,attrClassName,attrDefault} = attrObj;
    const {attributes,setAttributes} = props;

    let className,classArr;

    const setClassName = () => {
        
        let currentAttrClass = classNames(attributes.className)
        
        if ('function' === typeof attrClassName) {
            classArr = attrClassName(props.attributes);
        } 
        else {

            const attrVal = isUndefined(attributes[attrName])
            ?   attrDefault
            :   attributes[attrName];  

            classArr= new Object();
            classArr[attrClassName] = attrVal;
        }
        
        className = classNames(currentAttrClass,classArr);


        if (! isEqual(className,currentAttrClass)) {

            setAttributes({className:className});
            currentAttrClass = className;
        }
        
    }

    useEffect(()=> {

        setClassName();

    });  
    
    return className;
}

/**
 * 
 * @param {*} attrObj 
 * @param {*} props 
 */
const useAttribute = (attrObj,props) => {

    const {attrDefault,attrName,attrClassName} = attrObj;
    
    let currentAttrVal = 
        (
            'function' === typeof attrName
            || isUndefined(props.attributes[attrName])
        )
            ?   null
            :   props.attributes[attrName];

    const [attrVal,setAttrVal] = useState(attrDefault);

    const updateAttribute = (newAttrVal) => {
        
        if (
            newAttrVal == currentAttrVal
            && newAttrVal == attrVal
        ) {
            return;
        }
        setAttrVal(newAttrVal);

        let attributes = new Object();
        attributes[attrName] = newAttrVal;

        props.setAttributes (attributes);

    }

    return {attrVal,updateAttribute};

}

/**
 * 
 * @param {*} attrObj 
 * @param {*} props 
 */
const useAttributeAndClass = (attrObj,props) =>
{
    const className = useAttributeClass(attrObj,props);
    const {attrVal,updateAttribute} = useAttribute(attrObj,props);

    return [
        className,
        attrVal,
        updateAttribute
    ];    
}

/**
 * 
 */
export {
    useAttributeAndClass as default,
    useAttribute,
    useAttributeClass
};