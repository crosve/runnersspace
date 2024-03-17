function Cards({ title, workouts }) {
  return (
    <div className="bg-white shadow-lg p-4 rounded-md mb-4">
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      {workouts.map((workout, index) => (
        <p key={index} className="text-sm">
          &bull; {workout.workout}
        </p>
      ))}
    </div>
  );
}

export default Cards;
