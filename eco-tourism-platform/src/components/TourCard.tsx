interface Props {
  title: string;
  price: string;
  days: string;
}

function TourCard({ title, price, days }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">

      <img
        src="/destination.jpg"
        className="h-48 w-full object-cover"
      />

      <div className="p-4">

        <h3 className="text-xl font-bold">{title}</h3>

        <p className="text-gray-500">{days}</p>

        <div className="flex justify-between items-center mt-3">

          <span className="text-green-700 font-bold">
            {price}
          </span>

          <span className="text-yellow-500">
            ★ 4.7
          </span>

        </div>

      </div>

    </div>
  );
}

export default TourCard;