interface LabelProps {
  label: string;
}

const CustomLegend = ({ label }: LabelProps) => (
  <div className="flex flex-col items-center gap-2 text-sm text-gray-700">
    <div
      className={`flex  items-center text-[12px] font-bold  ${
        label === 'Order'
          ? 'rotate-[-90deg] origin-ceter'
          : 'mt-4 text-[12px] font-bold '
      }`}
    >
      <span>{label}</span>
    </div>
  </div>
);
export default CustomLegend;
