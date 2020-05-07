const { __ } = wp.i18n;

const {
    InspectorControls,
    MediaUpload,
} = wp.blockEditor;

const {
    PanelBody,
    TextControl,
    Button
} = wp.components;

// import UploadImage from '../../components/UploadImage';
import Image from '../../components/image';

const Inspectors = ({
    count,
    attributes,
    setAttributes,
}) => {

    const {tabs=[]} = attributes;
    
    if (1 > count) {
        return '';
    }

    let dirty = false;
    let newTabs = Array.from(tabs);

    for(var i=0;i<count;i++){
        if ('undefined' === typeof newTabs[i]) {
            newTabs[i] = {
                title: `Tab ${i+1}`,
                img: '',
            };
            dirty = true;
        }
    }   
    
    if (dirty) {
        setAttributes({tabs:newTabs});
    }

    return (
        <InspectorControls>
                {tabs.map((tab,i)=>{

                    const tabImg = tabs[i].img;
                    const tabTitle = tabs[i].title;

                    return (
                        <PanelBody key = {`tab-${i}`} title = {`Tab ${i+1}`}>
                        
                            <TextControl 
                                
                                label={`title`}
                                value={tabTitle}
                                onChange={(newTitle)=>{
                                    let newTabs = Array.from(tabs);
                                    newTabs[i].title = newTitle;
                                    setAttributes({tabs:newTabs})
                                }}
                            />
                            <MediaUpload
                                onSelect={  (newImage) => {
                                    console.log ("select new image",newImage);
                                    let newTabs = Array.from(tabs);
                                    newTabs[i].img = newImage.url;
                                    setAttributes({tabs:newTabs})
                                } }
                                value={ tabImg }
                                render={ ( { open } ) => (
                                    <Button onClick={ open }>
                                        <Image src={ tabImg } placeholder={`Insert Icon`} />
                                    </Button>
                                ) }					
                            />
                        
                        </PanelBody>
                    );    
                })}
        </InspectorControls>
    );
}

export default Inspectors;