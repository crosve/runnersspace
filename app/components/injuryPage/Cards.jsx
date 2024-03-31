function Cards({ title, workouts }) {
  title = title.replace(/\*/g, "");
  const removeAsterisks = (str) => {
    return str.replace(/\*/g, "");
  };
  return (
    <div className="bg-white shadow-lg p-4 rounded-md mb-4 pt-6 hover:scale-110 transition-transform">
      <h2 className="text-lg font-bold mb-2 underline text-center">{title}</h2>
      {workouts.map((workout, index) => (
        <div>
          <p key={index} className="text-sm pb-1 font-bold">
            &bull; {removeAsterisks(workout.workout)}
          </p>
          <h3 className="text-sm pb-1">Demo: </h3>
        </div>
      ))}
    </div>
  );
}

export default Cards;
