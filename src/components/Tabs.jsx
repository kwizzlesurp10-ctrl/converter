
import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <ul className="flex items-center border-b border-gray-700">
        {children.map((child) => (
          <li
            key={child.props.label}
            className={`px-4 py-3 -mb-px font-semibold text-lg border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === child.props.label
                ? 'border-purple-500 text-white'
                : 'border-transparent text-gray-500 hover:text-white'
            }`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </li>
        ))}
      </ul>
      <div className="pt-6">
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return (
              <div
                key={child.props.label}
                className="animate-fade-in"
              >
                {child.props.children}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const Tab = ({ label, children }) => {
  return (
    <div label={label} className="hidden">
      {children}
    </div>
  );
};

export default Tabs;
