import {Review} from '../../local-react-components/blocks/review';

export default (props) => {

    console.log ('c',props);

    const {attributes,className} = props;

    return <Review attrs={attributes} className={className} />
}