import React from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';
import { Button, Divider, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';

import TabToolbar from '../../components/styled/TabToolbar';
import { AddLinkModal } from '../../components/styled/AddLinkModal';
import { EmptyTab } from '../../components/styled/EmptyTab';

import { DescriptionEditor } from './components/DescriptionEditor';
import { LinkList } from './components/LinkList';
import { useEntityData, useRefetch, useRouteToTab } from '../../EntityContext';

const DocumentationContainer = styled.div`
    margin: 0 auto;
    padding: 40px 0;
    max-width: 550px;
`;

export const DocumentationTab = () => {
    const { entityData } = useEntityData();
    const refetch = useRefetch();
    const description = entityData?.editableProperties?.description || entityData?.description || '';
    const links = entityData?.institutionalMemory?.elements || [];

    const routeToTab = useRouteToTab();
    const isEditing = queryString.parse(useLocation().search, { parseBooleans: true }).editing;

    return isEditing ? (
        <>
            <DescriptionEditor onComplete={() => routeToTab({ tabName: 'Documentation' })} />
        </>
    ) : (
        <>
            {description || links.length ? (
                <>
                    <TabToolbar>
                        <div>
                            <Button
                                type="text"
                                onClick={() => routeToTab({ tabName: 'Documentation', tabParams: { editing: true } })}
                            >
                                <EditOutlined /> Edit
                            </Button>
                            <AddLinkModal buttonProps={{ type: 'text' }} refetch={refetch} />
                        </div>
                    </TabToolbar>
                    <DocumentationContainer>
                        {description ? (
                            <MDEditor.Markdown style={{ fontWeight: 400 }} source={description} />
                        ) : (
                            <Typography.Text type="secondary">No documentation added yet.</Typography.Text>
                        )}
                        <Divider />
                        <LinkList refetch={refetch} />
                    </DocumentationContainer>
                </>
            ) : (
                <EmptyTab tab="documentation">
                    <Button onClick={() => routeToTab({ tabName: 'Documentation', tabParams: { editing: true } })}>
                        <EditOutlined /> Add Documentation
                    </Button>
                    <AddLinkModal refetch={refetch} />
                </EmptyTab>
            )}
        </>
    );
};
