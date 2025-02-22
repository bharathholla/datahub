import React from 'react';
import { BookOutlined } from '@ant-design/icons';
import { EntityType, Owner } from '../../../../types.generated';
import DefaultPreviewCard from '../../../preview/DefaultPreviewCard';
import { useEntityRegistry } from '../../../useEntityRegistry';

export const Preview = ({
    urn,
    name,
    definition,
    owners,
}: {
    urn: string;
    name: string;
    definition?: string | null;
    owners?: Array<Owner> | null;
}): JSX.Element => {
    const entityRegistry = useEntityRegistry();
    return (
        <DefaultPreviewCard
            url={entityRegistry.getEntityUrl(EntityType.GlossaryTerm, urn)}
            name={name || ''}
            description={definition || ''}
            owners={owners}
            logoComponent={<BookOutlined style={{ fontSize: '24px' }} />}
        />
    );
};
