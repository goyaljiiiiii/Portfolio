export default function About() {
  return (
    <section className="py-24 px-6 relative bg-white" id="about">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 relative inline-block">
          Beyond The Resume
          <svg
            className="absolute w-full h-3 bottom-0 left-0 text-cyan-500 opacity-40"
            preserveAspectRatio="none"
            viewBox="0 0 100 10"
          >
            <path
              d="M0 5 Q 50 10 100 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Sales Development Representative at algoacquisition building AI-powered outbound lead generation systems, Campus Ambassador Lead at Work2Hire, and Founder of CDN IGNOU. Curiosity-first: learning fast, building systems, and leading communities.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="p-6 bg-cyan-50 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 group border border-cyan-100">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
            🤖
          </div>
          <div className="font-bold text-gray-900 text-sm">SDR @ AI Outbound</div>
          <div className="text-xs text-gray-500">algoacquisition</div>
        </div>

        <div className="p-6 bg-emerald-50 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 group border border-emerald-100">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
            🚀
          </div>
          <div className="font-bold text-gray-900 text-sm">Manager Lead</div>
          <div className="text-xs text-gray-500">Work2Hire</div>
        </div>

        <div className="p-6 bg-purple-50 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 group border border-purple-100">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
            👑
          </div>
          <div className="font-bold text-gray-900 text-sm">Founder & Tech Lead</div>
          <div className="text-xs text-gray-500">CDN IGNOU</div>
        </div>

        <div className="p-6 bg-yellow-50 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 group border border-yellow-100">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
            ⚡
          </div>
          <div className="font-bold text-gray-900 text-sm">Project Admin</div>
          <div className="text-xs text-gray-500">SSOC '26 / GSSOC</div>
        </div>

        <div className="p-6 bg-rose-50 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 group border border-rose-100">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
            📹
          </div>
          <div className="font-bold text-gray-900 text-sm">Content & Mentor</div>
          <div className="text-xs text-gray-500">Self Taught Bob</div>
        </div>

        <div className="p-6 bg-indigo-50 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 group border border-indigo-100">
          <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
            🏆
          </div>
          <div className="font-bold text-gray-900 text-sm">Top 25 Contributor</div>
          <div className="text-xs text-gray-500">Apertre 3.0</div>
        </div>
      </div>
    </section>
  );
}

