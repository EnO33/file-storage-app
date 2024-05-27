import Image from "next/image";
import React from "react";

const PrivacyPage = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-3xl text-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={200}
            className="inline-block mb-8"
          />
          <h1 className="text-3xl font-bold mb-4 text-gray-700 text-center">
            Privacy Policy
          </h1>
          <div className="text-justify mt-10 flex flex-col gap-8 text-slate-900">
            <p>
                Welcome to File Application! Your privacy is critically important to
                us. This Privacy Policy outlines the types of information we collect
                from users, how we use, share, and protect that information.
            </p>
            <p>
                When you use our application to store, share, or manage your files,
                we collect data such as your name, email address, and any files you
                upload. This information is used to provide and improve our
                services, communicate with you, and ensure the security of your
                data.
            </p>
            <p>
                We implement robust security measures to protect your data from
                unauthorized access, disclosure, alteration, and destruction. We do
                not sell or share your personal information with third parties for
                marketing purposes. By using our app, you consent to the collection
                and use of your information in accordance with this policy. For any
                questions or concerns, please contact our support team.
            </p>
        </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
