import React from 'react'

interface ToggleProps {
  label: string
  checked: boolean
  onChange: () => void
  toggleClass?: string // Optional class for customization
}

export default function Toggle({
  label,
  checked,
  onChange,
  toggleClass = '', // Optional prop, default to empty string
}: ToggleProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <span>{label}</span>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={onChange}
        />
        <div
          className={`toggle-bg w-12 h-6 bg-gray-300 rounded-full shadow-inner relative ${
            checked ? 'bg-green-600' : ''
          } ${toggleClass}`} // Add toggleClass for customization
        >
          <div
            className={`toggle-dot w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
              checked ? 'translate-x-6' : 'translate-x-0'
            }`}
          ></div>
        </div>
      </label>
    </div>
  )
}
