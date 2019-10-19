/**
 * Externals
 */
// import {useEffect,useState} from 'react';
import {isEqual,isUndefined,defaultTo} from 'lodash';
import classNames from 'classnames/dedupe';

const {useEffect,useState,useCallback} = wp.element;



/**
 * 
 * @param {*} attrObj 
 * @param {*} props 
 */
const useAttributeClass = (attrObj,props) => {

    const {attributes,setAttributes} = props;

    console.log ('useAttributeClass starts:',attrObj,attributes);

    let currentAttrClass = classNames(attributes.className);
    let className = currentAttrClass;

    const {attrName,attrClassName,attrDefault} = attrObj;
    
    // const attrVal = isUndefined(attributes[attrName])
    //     ?   attrDefault
    //     :   attributes[attrName];  

    const attrVal = defaultTo (attributes[attrName],attrDefault);

    const getClassName = 
        // useCallback(
        () => {
            
            let classArr;
    
            // if ('function' === typeof attrClassName) {
            //     classArr = attrClassName(attributes);
            // } 
            // else {
    
                classArr= new Object();
                classArr[attrClassName] = attrVal;
            // }
            
            return classNames(currentAttrClass,classArr);
    
        }
        // },
        // [currentAttrClass,attrClassName,attrVal,attrName]
    // );    

    useEffect(()=> {

        className = getClassName();
        console.log ('useAttributeClass useEffect',className);

    });  
    if (! isEqual(className,currentAttrClass)) {

        setAttributes({className:className});
        currentAttrClass = className;
    }    
    
    console.log ('useAttributeClass done',currentAttrClass);

    return currentAttrClass;
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