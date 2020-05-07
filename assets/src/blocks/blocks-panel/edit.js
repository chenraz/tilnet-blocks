const {TabPanel} = wp.components;

import {BlocksEdit,useCurrent} from '../blocks-navigation';
import Inspectors from './Inspectors';
import Image from '../../components/image';

const BlocksPanelEdit = ({
	className,
	clientId,	
	attributes,
	setAttributes,
}) => {
	const {currentClientId,currentIndex,toggleCurrent,count,innerBlocks} = useCurrent(clientId);
	const {tabs=[]} = attributes;


	if (1>count) {
		return <BlocksEdit {...{clientId,currentIndex,toggleCurrent}} />;
	}

	const tabsData = innerBlocks.map((block,i) => {

		console.log ('mapping tabs data',tabs,i);

		const isUnDefined = 'undefined' === typeof tabs[i];
		const testTitle = (
			<div className='tab-title'>
				<Image src={isUnDefined ? '' : tabs[i].img} alt='deco' />
				<span 
                    dangerouslySetInnerHTML={{__html: isUnDefined ? '' : tabs[i].title}}                

				/>
			</div>
		);
		return {
			name: block.clientId,
			// title: ("undefined" === typeof tabs[i])
			// 	?	`Tab ${i+1}`
			// 	:	tabs[i].title,
			title: testTitle,
			index: i,
		}
	});

	const onSelect = (clientId) => {
		toggleCurrent(clientId);
	}


	return (
		<div className={ className }>
			<Inspectors {...{
			    count,
				attributes,
				setAttributes
			}}/>
			<TabPanel
				tabs={tabsData}
				onSelect={onSelect}
				initialTabName={currentClientId}
			>
				{
					(tab) => {


						return (
							<BlocksEdit clientId={clientId} currentIndex={currentIndex} toggleCurrent={toggleCurrent} />

						)
					}
				}
			</TabPanel>				
		</div>		
	)
}

export default BlocksPanelEdit;