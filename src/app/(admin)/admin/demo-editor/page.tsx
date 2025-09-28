'use client';

import React from 'react';
import AdminLayout from '../../../../components/admin/AdminLayout';
import RichTextEditorDemo from '../../../../components/admin/RichTextEditorDemo';

const DemoEditorPage: React.FC = () => {
    return (
        <AdminLayout>
            <RichTextEditorDemo />
        </AdminLayout>
    );
};

export default DemoEditorPage;
