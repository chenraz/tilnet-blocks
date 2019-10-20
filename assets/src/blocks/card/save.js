import {Card} from '../../local-react-components/blocks/card';

export default (props) => {

    console.log ('card',props);

    const {attributes,className} = props;
    const {image,text} = attributes;

    return <Card text={text} image={image} className={className} />
}