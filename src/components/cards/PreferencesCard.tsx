// components/PreferencesCard.tsx
import React, { useState } from 'react'
import CardLayout from '../layouts/CardLayout'
import Switch from '../form/SwitchField'

export default function PreferencesCard() {
  const [showProfile, setShowProfile] = useState(true)
  const [jobRecs, setJobRecs] = useState(false)
  const [emailNotif, setEmailNotif] = useState(false)
  const [smsNotif, setSmsNotif] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)
  const [appUpdates, setAppUpdates] = useState(true)

  const header = (
    <h3 className="text-lg font-semibold text-gray-900">
      Preferences &amp; Visibility
    </h3>
  )

  return (
    <CardLayout
      header={header}
      elevation="sm"
      bordered
      cardBg="bg-white"
      className="max-w-md"
    >
      <div className="space-y-6">
        {/* Profile Visibility */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-500">Profile Visibility</p>
          <div className="flex items-center justify-between">
            <span>Show Profile to Recruiters</span>
            <Switch checked={showProfile} onChange={setShowProfile} />
          </div>
          <div className="flex items-center justify-between">
            <span>Receive Job Recommendations</span>
            <Switch checked={jobRecs} onChange={setJobRecs} />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-500">
            Notification Preferences
          </p>
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch checked={emailNotif} onChange={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between">
            <span>SMS Notifications</span>
            <Switch checked={smsNotif} onChange={setSmsNotif} />
          </div>
          <div className="flex items-center justify-between">
            <span>Weekly Job Digest</span>
            <Switch checked={weeklyDigest} onChange={setWeeklyDigest} />
          </div>
          <div className="flex items-center justify-between">
            <span>Application Updates</span>
            <Switch checked={appUpdates} onChange={setAppUpdates} />
          </div>
        </div>
      </div>
    </CardLayout>
  )
}
