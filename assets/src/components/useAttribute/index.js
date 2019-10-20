/**
 * Externals
 */
// import {useEffect,useState} from 'react';
import {defaultTo,isEmpty} from 'lodash';
import classNames from 'classnames/dedupe';
import { useEffect } from 'react';

const {useState,useReducer} = wp.element;



/**
 * 
 * @param {*} attrObj 
 * @param {*} props 
 */
const useAttributeClass = (attrObj,props) => {

    const {attributes,setAttributes} = props;
    const {attrName,attrClassName,attrDefault} = attrObj;


    // const className = classNames(attributes.className);
    // const currentAttrclassName = classNames(attributes.className);
    const currentAttrclassName = attributes.className;

    const attrVal = defaultTo (attributes[attrName],attrDefault);

    console.log (`useAttributeClass ${attrName} currentAttrclassName:${currentAttrclassName} starts`,attrObj,props);

    const getClassName = () => {
            
        let classArr;

        classArr= new Object();
        classArr[attrClassName] = attrVal;

        console.log (`useAttributeClass ${attrName} getClassName attrval: ${attrVal}`);
        
        // return classNames(className,classArr);
        return classNames(currentAttrclassName,classArr);


    }
    
    let newClassName = getClassName();

    // useEffect (()=>{
        
        newClassName = getClassName();

        if (newClassName != currentAttrclassName) {


            console.log (`useAttributeClass ${attrName} detect changes newClassName:${newClassName} currentAttrclassName: ${currentAttrclassName}`);

            // if (newClassName != className) {
            setAttributes({className:newClassName})    
        }
        
        console.log (`useAttributeClass ${attrName} done className: ${currentAttrclassName} newClassName: ${newClassName}`);
    // });

    return newClassName;
}

/**
 * 
 * @param {*} attrObj 
 * @param {*} props 
 */
const useAttribute = (attrObj,props) => {

    const {attrDefault,attrName} = attrObj;

    const [attrVal,setAttrVal] = useState(defaultTo(props.attributes[attrName],attrDefault));

    const updateAttribute = (newAttrVal) => {
        
        if (
            newAttrVal == attrVal
        ) {
            return;
        }

        let attributes = new Object();
        attributes[attrName] = newAttrVal;

        props.setAttributes (attributes);
        setAttrVal(newAttrVal);

    }

    console.log (`updateAttribute ${attrName} returns:`,attrVal);

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

const useAttributeValueClass = (attrObj,props) => {
    
    const {attributes,setAttributes} = props;
    
    const {attrName,attrDefault} = attrObj;

    const {className: currentAttrClassName} = attributes;

    const getClass = () => {
        const attrVal = defaultTo (attributes[attrName],attrDefault);
        return (!isEmpty(attrVal))
            ?  `${attrName}-${attrVal}` 
            :   '';        
    }

    const reducer = (className) => {

        const newClassName = getClass();

        if (newClassName != className) {

            const fullClassName = classNames(
                currentAttrClassName,
                {[className]: false},
                {[newClassName]: true}
            );

            setAttributes({
                className: fullClassName
            });
        }
        return newClassName;
    }

    // const attrVal = defaultTo (attributes[attrName],attrDefault);
    
    // const initialClassName = attrVal
    //     ?  `${attrClassName}-${attrVal}` 
    //     :   '';

    const initialClassName = getClass();
    const [className,setClassName] = useReducer(reducer,initialClassName);

    if (className != initialClassName) {
        setClassName();
    }

    return currentAttrClassName;
}

/**
 * 
 */
export {
    useAttributeAndClass as default,
    useAttribute,
    useAttributeClass,
    useAttributeValueClass
};