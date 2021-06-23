import React from 'react';
import Card from './Card';

const CardList = ({ robots, searchField }) => {
  const filteredRobots = robots.filter((robot) =>
    robot.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return filteredRobots.map((robot) => {
    return (
      <Card
        key={robot.id}
        id={robot.id}
        name={robot.name}
        email={robot.email}
      />
    );
  });
};

export default CardList;
