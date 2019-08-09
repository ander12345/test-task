import React from 'react';
import './navigation.scss';
import cn from 'classnames';

const Navigation = ({ list }) => (
  <div className="navbar">
    {list.map(({ item, selected }) => (
      <div className={cn('navbar--item', { 'navbar--item__selected': selected })} key={item}>
        <a className="navbar--item-link" href={item}>
          {item}
        </a>
      </div>
    ))}
  </div>
);

export default Navigation;
