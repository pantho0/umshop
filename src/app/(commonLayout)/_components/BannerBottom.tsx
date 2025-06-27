import { MessagesSquare, RefreshCcw, Truck, WalletCards } from "lucide-react";

const BannerBottom = () => {
  return (
    <div className="grid grid-cols-2 my-[30px] md:grid-cols-4 justify-between px-4 md:px-14 gap-4 md:my-[72]">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="bg-slate-100 p-4 rounded-full">
          <Truck className="text-gray-800 size-6 md:size-8" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-center md:text-left md:text-base">
            Free Shipping & Return
          </h4>
          <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">
            For All Orders on any amount
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="bg-slate-100 p-4 rounded-full">
          <WalletCards className="text-gray-800 size-6 md:size-8" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-center md:text-left md:text-base">
            Secure Payment
          </h4>
          <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">
            We ensure secure payment
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="bg-slate-100 p-4 rounded-full">
          <RefreshCcw className="text-gray-800 size-6 md:size-8" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-center md:text-left md:text-base">
            Money Back Guarantee
          </h4>
          <p className="text-[11px] md:text-sm text-gray-600 text-center md:text-left">
            Returning money within 30 days
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="bg-slate-100 p-4 rounded-full">
          <MessagesSquare className="text-gray-800 size-6 md:size-8" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-center md:text-left md:text-base">
            24/7 Customer Support
          </h4>
          <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">
            Friendly Customer Support
          </p>
        </div>
      </div>
    </div>
  );
};

export default BannerBottom;
