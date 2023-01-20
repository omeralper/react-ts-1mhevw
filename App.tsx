import classNames = require('classnames');
import * as React from 'react';
import './style.css';

export default function App() {
  const [activeKey, setActiveKey] = React.useState('1');
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <Tabs
        activeKey={activeKey}
        onSelect={(tabKey) => {
          setActiveKey(tabKey);
        }}
      >
        <Tab title="tab1" tabKey={'1'} isActive={true}>
          content1
        </Tab>
        <Tab title="tab2" tabKey={'2'}>
          ddd
        </Tab>
        <Tab title="tab3" tabKey={'3'} unMountOnExit={true}>
          dddxfvg
        </Tab>
      </Tabs>
    </div>
  );
}
interface TabsProps {
  children: React.ReactElement<TabProps>[];
  activeKey: string;
  onSelect: (tabKey: string) => void;
}
export const Tabs = (props: TabsProps) => {
  const { children, activeKey, onSelect } = props;

  const childrenWithProps = React.Children.map(children, (tab) => {
    if (React.isValidElement(tab)) {
      return React.cloneElement(tab, {
        ...tab.props,
        isActive: activeKey === tab.props.tabKey,
      });
    }
    return tab;
  });

  const onTabClick = (tab: React.ReactElement<TabProps>) => () => {
    onSelect(tab.props.tabKey);
  };

  return (
    <div className="Tabs">
      <div className="tabTitles">
        {childrenWithProps.map((tab) => (
          <div
            key={tab.props.tabKey}
            onClick={onTabClick(tab)}
            className={classNames('tabTitle', {
              isActive: tab.props.isActive,
            })}
          >
            <a>{tab.props.title}</a>
          </div>
        ))}
      </div>
      {childrenWithProps}
    </div>
  );
};

interface TabProps {
  children: React.ReactNode;
  title: string;
  isActive?: boolean;
  tabKey: string;
  unMountOnExit?: boolean;
}
export const Tab = (props: TabProps) => {
  const { children, isActive, unMountOnExit } = props;
  const unMount = !unMountOnExit || isActive;
  return (
    <div className="Tab">
      {unMount && (
        <div
          className={classNames('tabContent', {
            hide: !isActive,
          })}
        >
          {children}
        </div>
      )}
    </div>
  );
};
