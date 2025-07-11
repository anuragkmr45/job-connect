
// 'use client'

// import React, { useState } from 'react'
// import { Tag, Button, Form } from 'antd'
// import { FiMapPin, FiUser, FiBriefcase } from 'react-icons/fi'
// import CardLayout from '@/components/layouts/CardLayout'
// import SearchBar from '@/components/form/SearchBar'
// import SelectField, { Option } from '@/components/form/SelectField'
// import CustomModal from '@/components/CustomModal'
// import { useFetchDropdownsQuery } from '@/services/dropdownService'

// const quickFilters = [
//     'Remote Jobs', 'Security Roles', 'Manager Roles', 'Admin Roles', 'Startups',
//     'Leadership Positions', 'Entry Level', 'Bhubaneswar', 'Banking', 'Experienced',
//     'Government Contracts', 'Private Contracts', 'Mumbai', 'Hyderabad',
// ]

// type ModalKey = 'location' | 'trade' | 'role' | 'qual' | 'status'

// interface JobSearchFiltersCardProps {
//   searchQuery: string
//   setSearchQuery: (q: string) => void
// }

// export default function JobSearchFiltersCard({ searchQuery, setSearchQuery }: JobSearchFiltersCardProps) {
//     // ─── 1) Always call hooks at top ───────────────────────────────────────
//     const [activeModal, setActiveModal] = useState<ModalKey | null>(null)
//     const [selected, setSelected] = useState<Record<ModalKey, Option | null>>({
//         location: null,
//         trade: null,
//         role: null,
//         qual: null,
//         status: null,
//     })
//     const [form] = Form.useForm<{ modalSelect: number | string }>()
//     const { data: dd, isLoading, error } = useFetchDropdownsQuery()

//     // ─── 2) Safely map dropdowns (use empty arrays if dd is undefined) ───
//     const {
//         trades = [],
//         statuses = [],
//         locations = [],
//         roles = [],
//         quals = [],
//     } = dd ?? {}

//     const locationOpts: Option[] = locations.map(l => ({ value: l.id, label: l.name }))
//     const tradeOpts: Option[] = trades.map(t => ({ value: t.id, label: t.name }))
//     const roleOpts: Option[] = roles.map(r => ({ value: r.id, label: r.name }))
//     const qualOpts: Option[] = quals.map(q => ({ value: q.id, label: `${q.level} – ${q.stream}` }))
//     const statusOpts: Option[] = statuses.map(s => ({ value: s.id, label: s.name }))

//     // ─── 3) Now it’s safe to bail out ─────────────────────────────────────
//     if (isLoading) {
//         return <CardLayout elevation="sm" className="mx-auto p-6">Loading filters…</CardLayout>
//     }
//     if (error) {
//         return <CardLayout elevation="sm" className="mx-auto p-6">Error loading filters</CardLayout>
//     }

//     // ─── 4) Handlers & modal data ─────────────────────────────────────────
//     const openModal = (key: ModalKey) => {
//         setActiveModal(key)
//         form.setFieldsValue({ modalSelect: selected[key]?.value })
//     }
//     const closeModal = () => setActiveModal(null)

//     const handleSave = async () => {
//         const { modalSelect } = await form.validateFields()
//         const optsMap: Record<ModalKey, Option[]> = {
//             location: locationOpts,
//             trade: tradeOpts,
//             role: roleOpts,
//             qual: qualOpts,
//             status: statusOpts,
//         }
//         const choice = optsMap[activeModal!].find(o => o.value === modalSelect) ?? null
//         if (activeModal) {
//             setSelected(prev => ({ ...prev, [activeModal]: choice }))
//             if (choice) setSearchQuery(choice.label)
//         }
//         closeModal()
//     }

//     const modalTitles: Record<ModalKey, string> = {
//         location: 'Select Location',
//         trade: 'Select Experience',
//         role: 'Select Role Type',
//         qual: 'Select Qualification',
//         status: 'Select Status',
//     }

//     // ─── 5) Render ─────────────────────────────────────────────────────────
//     return (
//         <>
//             <CardLayout elevation="sm" className="mx-auto">
//                 {/* Main search bar */}
//                 <SearchBar
//                     placeholder="Search for roles or companies…"
//                     defaultValue={searchQuery}
//                     onSearch={v => setSearchQuery(v)}
//                     enterButton="Go"
//                     size="middle"
//                     className="w-full"
//                 />

//                 {/* Filter buttons */}
//                 <div className="mt-4 flex flex-wrap gap-2">
//                     <Button icon={<FiMapPin />} shape="round" onClick={() => openModal('location')}>
//                         {selected.location?.label || 'Location'}
//                     </Button>
//                     <Button icon={<FiUser />} shape="round" onClick={() => openModal('trade')}>
//                         {selected.trade?.label || 'Experience'}
//                     </Button>
//                     <Button icon={<FiBriefcase />} shape="round" onClick={() => openModal('role')}>
//                         {selected.role?.label || 'Role Type'}
//                     </Button>
//                     <Button icon={<FiBriefcase />} shape="round" onClick={() => openModal('qual')}>
//                         {selected.qual?.label || 'Qualification'}
//                     </Button>
//                     <Button icon={<FiBriefcase />} shape="round" onClick={() => openModal('status')}>
//                         {selected.status?.label || 'Status'}
//                     </Button>
//                 </div>

//                 {/* Quick filters */}
//                 <div className="mt-6">
//                     <div className="text-sm font-medium mb-2">Quick Filters:</div>
//                     <div className="flex flex-wrap gap-2">
//                         {quickFilters.map(f => (
//                             <Tag key={f} color="default" className="cursor-pointer">
//                                 {f}
//                             </Tag>
//                         ))}
//                     </div>
//                 </div>
//             </CardLayout>

//             {/* Reusable modal */}
//             <CustomModal
//                 visible={!!activeModal}
//                 onClose={closeModal}
//                 width="40%"
//                 height="300px"
//                 header={<h4 className="text-lg font-semibold">{activeModal && modalTitles[activeModal]}</h4>}
//                 footer={<Button type="primary" onClick={handleSave}>Save</Button>}
//             >
//                 <Form form={form} layout="vertical" initialValues={{ modalSelect: null }}>
//                     <SelectField
//                         name="modalSelect"
//                         label=""
//                         options={activeModal ? { location: locationOpts, trade: tradeOpts, role: roleOpts, qual: qualOpts, status: statusOpts }[activeModal] : []}
//                         placeholder="Start typing to search…"
//                         rules={[{ required: true, message: 'Please select one' }]}
//                     />
//                 </Form>
//             </CustomModal>
//         </>
//     )
// }

'use client'

import React, { useState, useEffect } from 'react'
import { Tag, Button, Form } from 'antd'
import { FiMapPin, FiUser, FiBriefcase } from 'react-icons/fi'
import CardLayout from '@/components/layouts/CardLayout'
import SearchBar from '@/components/form/SearchBar'
import SelectField, { Option } from '@/components/form/SelectField'
import CustomModal from '@/components/CustomModal'
import { useFetchDropdownsQuery } from '@/services/dropdownService'

const quickFilters = [
    'Remote Jobs', 'Security Roles', 'Manager Roles', 'Admin Roles', 'Startups',
    'Leadership Positions', 'Entry Level', 'Bhubaneswar', 'Banking', 'Experienced',
    'Government Contracts', 'Private Contracts', 'Mumbai', 'Hyderabad',
]

type ModalKey = 'location' | 'trade' | 'role' | 'qual' | 'status'

interface JobSearchFiltersCardProps {
    searchQuery: string
    setSearchQuery: (q: string) => void
    filters: Record<ModalKey, Option | null>
    setFilters: (f: Record<ModalKey, Option | null>) => void
}

export default function JobSearchFiltersCard({
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
}: JobSearchFiltersCardProps) {
    // ─── state ─────────────────────────────────────────────────────────────
    const [activeModal, setActiveModal] = useState<ModalKey | null>(null)
    const [form] = Form.useForm<{ modalSelect: number | string }>()

    // Keep a local copy of the filters so we can prefill the modal on open
    const [selected, setSelected] = useState<Record<ModalKey, Option | null>>(filters)
    useEffect(() => {
        setSelected(filters)
    }, [filters])

    // ─── fetch dropdown data ───────────────────────────────────────────────
    const { data: dd, isLoading, error } = useFetchDropdownsQuery()
    const {
        trades = [],
        statuses = [],
        locations = [],
        roles = [],
        quals = [],
    } = dd ?? {}

    const locationOpts = locations.map(l => ({ value: l.id, label: l.name }))
    const tradeOpts = trades.map(t => ({ value: t.id, label: t.name }))
    const roleOpts = roles.map(r => ({ value: r.id, label: r.name }))
    const qualOpts = quals.map(q => ({ value: q.id, label: `${q.level} – ${q.stream}` }))
    const statusOpts = statuses.map(s => ({ value: s.id, label: s.name }))

    if (isLoading) return <CardLayout elevation="sm" className="mx-auto p-6">Loading filters…</CardLayout>
    if (error) return <CardLayout elevation="sm" className="mx-auto p-6">Error loading filters</CardLayout>

    // ─── modal open/close ─────────────────────────────────────────────────
    const openModal = (key: ModalKey) => {
        setActiveModal(key)
        form.setFieldsValue({ modalSelect: selected[key]?.value })
    }
    const closeModal = () => setActiveModal(null)

    // ─── save a single filter choice ──────────────────────────────────────
    const handleSave = async () => {
        const { modalSelect } = await form.validateFields()
        const optsMap: Record<ModalKey, Option[]> = {
            location: locationOpts,
            trade: tradeOpts,
            role: roleOpts,
            qual: qualOpts,
            status: statusOpts,
        }
        const choice = optsMap[activeModal!].find(o => o.value === modalSelect) ?? null

        if (activeModal) {
            const newFilters = { ...selected, [activeModal]: choice }
            setSelected(newFilters)
            setFilters(newFilters)
        }
        closeModal()
    }

    // ─── clear one filter ──────────────────────────────────────────────────
    const clearFilter = (key: ModalKey) => {
        const newFilters = { ...selected, [key]: null }
        setSelected(newFilters)
        setFilters(newFilters)
    }

    // ─── reset every filter ────────────────────────────────────────────────
    const handleReset = () => {
        const empty: Record<ModalKey, Option | null> = {
            location: null,
            trade: null,
            role: null,
            qual: null,
            status: null,
        }
        setSelected(empty)
        setFilters(empty)
    }

    // ─── UI helpers ───────────────────────────────────────────────────────
    const modalTitles: Record<ModalKey, string> = {
        location: 'Select Location',
        trade: 'Select Experience',
        role: 'Select Role Type',
        qual: 'Select Qualification',
        status: 'Select Status',
    }
    function getIconForKey(k: ModalKey) {
        switch (k) {
            case 'location': return <FiMapPin />
            case 'trade': return <FiUser />
            default: return <FiBriefcase />
        }
    }

    // ─── render ───────────────────────────────────────────────────────────
    return (
        <>
            <CardLayout elevation="sm" className="mx-auto">
                {/* free-text search */}
                <SearchBar
                    placeholder="Search for roles or companies…"
                    defaultValue={searchQuery}
                    onSearch={v => setSearchQuery(v)}
                    enterButton="Go"
                    size="middle"
                    className="w-full"
                />

                {/* filter buttons or closable tags */}
                <div className="mt-4 flex flex-wrap gap-2 items-center">
                    {(Object.keys(selected) as ModalKey[]).map(key =>
                        selected[key]
                            ? (
                                <Tag
                                    key={key}
                                    closable
                                    icon={getIconForKey(key)}
                                    onClose={() => clearFilter(key)}
                                >
                                    {selected[key]!.label}
                                </Tag>
                            )
                            : (
                                <Button
                                    key={key}
                                    icon={getIconForKey(key)}
                                    shape="round"
                                    onClick={() => openModal(key)}
                                >
                                    {modalTitles[key]}
                                </Button>
                            )
                    )}
                    <Button onClick={handleReset} danger>
                        Reset All
                    </Button>
                </div>

                {/* quick filters (unchanged) */}
                <div className="mt-6">
                    <div className="text-sm font-medium mb-2">Quick Filters:</div>
                    <div className="flex flex-wrap gap-2">
                        {quickFilters.map(f => (
                            <Tag key={f} color="default" className="cursor-pointer">
                                {f}
                            </Tag>
                        ))}
                    </div>
                </div>
            </CardLayout>

            {/* selection modal */}
            <CustomModal
                visible={!!activeModal}
                onClose={closeModal}
                width="40%"
                height="300px"
                header={<h4 className="text-lg font-semibold">{activeModal && modalTitles[activeModal]}</h4>}
                footer={<Button type="primary" onClick={handleSave}>Save</Button>}
            >
                <Form form={form} layout="vertical" initialValues={{ modalSelect: null }}>
                    <SelectField
                        name="modalSelect"
                        options={activeModal
                            ? { location: locationOpts, trade: tradeOpts, role: roleOpts, qual: qualOpts, status: statusOpts }[activeModal]
                            : []}
                        placeholder="Start typing to search…"
                        rules={[{ required: true, message: 'Please select one' }]} label={''} />
                </Form>
            </CustomModal>
        </>
    )
}
