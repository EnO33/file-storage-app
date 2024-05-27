import Image from "next/image";
import React from "react";

const TermsPage = () => {
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
            Terms of Service
          </h1>
          <div className="text-justify mt-10 flex flex-col gap-8 text-slate-900">
            <p className="text-gray-700 mb-4">
              Welcome to File Application! By using our application, you agree to
              comply with and be bound by the following terms and conditions.
              Please review these terms carefully. If you do not agree with
              these terms, you should not use our services.
            </p>
            <h2 className="text-2xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing and using File Application, you accept and agree to be
              bound by the terms and provisions of this agreement. In addition,
              when using our services, you shall be subject to any posted
              guidelines or rules applicable to such services.
            </p>
            <h2 className="text-2xl font-semibold mb-2">2. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. Any
              changes will be effective immediately upon posting. Your continued
              use of the service after any such changes constitutes your
              acceptance of the new terms.
            </p>
            <h2 className="text-2xl font-semibold mb-2">3. Use of Service</h2>
            <p className="text-gray-700 mb-4">
              You agree to use the service only for lawful purposes and in a way
              that does not infringe the rights of, restrict, or inhibit anyone
              else's use and enjoyment of the service. Prohibited behavior
              includes harassing or causing distress or inconvenience to any
              other user, transmitting obscene or offensive content, or
              disrupting the normal flow of dialogue within our service.
            </p>
            <h2 className="text-2xl font-semibold mb-2">4. Account Security</h2>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your
              account and password and for restricting access to your computer.
              You agree to accept responsibility for all activities that occur
              under your account or password.
            </p>
            <p className="text-gray-700 mb-4">
              For any questions or concerns regarding these terms, please
              contact our support team.
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

export default TermsPage;
