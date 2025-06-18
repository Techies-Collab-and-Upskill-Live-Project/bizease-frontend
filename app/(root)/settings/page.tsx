'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const BusinessSettings = dynamic(
  () =>
    import('@/components/settings/business-content').then((mod) => mod.default),
  { ssr: false },
);

const PreferenceSettings = dynamic(
  () =>
    import('@/components/settings/preference-content').then(
      (mod) => mod.default,
    ),
  { ssr: false },
);

const ProfileSettings = dynamic(
  () =>
    import('@/components/settings/personal-content').then((mod) => mod.default),
  { ssr: false },
);

const tabs = [
  { key: 'profile', label: 'Personal Information' },
  { key: 'business', label: 'Business Information' },
  { key: 'preferences', label: 'Preferences' },
];

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'business' | 'preferences'
  >('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'business':
        return <BusinessSettings />;
      case 'preferences':
        return <PreferenceSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="px-10 py-10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10 border-muted bg-gradient">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={cn(
              'rounded-none text-sm md:text-base mx-auto cursor-pointer text-surface-200 font-medium tracking-wide px-2 py-6 transition-all duration-200 border-b-[3px] border-transparent',
              {
                'border-surface-100': activeTab === tab.key,
              },
            )}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="w-full">{renderTabContent()}</div>
    </div>
  );
};

export default SettingsPage;
