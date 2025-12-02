
import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <ul className="flex border-b border-gray-600">
        {children.map((child) => (
          <li
            key={child.props.label}
            className={`${
              activeTab === child.props.label
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-300'
            } border-b-2  transition duration-300 ease-in-out px-4 py-2 cursor-pointer`}
            onClick={(e) => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </li>
        ))}
      </ul>
      <div className="py-4">
        {children.map((child) => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
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
