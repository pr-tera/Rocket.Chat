import { Box, MessageGenericPreviewImage } from '@rocket.chat/fuselage';
import type { ReactElement } from 'react';
import React from 'react';

import { useOembedLayout } from '../../hooks/useOembedLayout';
import type { UrlPreviewMetadata } from './UrlPreviewMetadata';

const UrlImagePreview = ({ url }: Pick<UrlPreviewMetadata, 'url'>): ReactElement => {
	const { maxHeight: oembedMaxHeight } = useOembedLayout();

	return (
		<Box maxHeight={oembedMaxHeight} maxWidth='100%'>
			<MessageGenericPreviewImage data-id={url} className='preview-image' url={url || ''} alt='' />
		</Box>
	);
};

export default UrlImagePreview;
