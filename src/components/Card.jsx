const Card = ({ date, main }) => {
    // const [day, month, dateValue] = new Date(date * 1000);
  return (
    <>
        <div>Card component</div>
        <p>{date}</p>
        <p>AQI: {main.aqi}</p>
    </>
  )
}

export default Card;