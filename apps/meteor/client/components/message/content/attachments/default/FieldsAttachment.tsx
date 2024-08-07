import { Box } from '@rocket.chat/fuselage';
import type { ReactNode } from 'react';
import React from 'react';

import Field from './Field';
import ShortField from './ShortField';

type FieldsAttachmentProps = {
	fields: {
		short?: boolean;
		title: ReactNode;
		value: ReactNode;
	}[];
};

const FieldsAttachment = ({ fields }: FieldsAttachmentProps) => (
	<Box flexWrap='wrap' display='flex' mb={4} mi={-4}>
		{fields.map((field, index) => (field.short ? <ShortField {...field} key={index} /> : <Field {...field} key={index} />))}
	</Box>
);

export default FieldsAttachment;
