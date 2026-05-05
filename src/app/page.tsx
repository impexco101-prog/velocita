export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="bg-cards border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-playfair font-bold text-text-primary">Velocita</h1>
          <p className="text-text-secondary mt-2">Premium VCE Tutoring for Melbourne Students</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-playfair font-bold text-text-primary mb-6">
            Accelerate Your ATAR Success
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-3xl mx-auto">
            Transform your VCE journey with personalized tutoring from Melbourne's top tutors. 
            Our proven methods help students achieve an average 8.5 point ATAR improvement.
          </p>
          <a 
            href="/diagnostic" 
            className="inline-block bg-gold-cta hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            Take Free ATAR Diagnostic
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-cards border border-card-border rounded-lg p-8">
            <div className="text-gold-cta text-3xl font-bold mb-4">8.5</div>
            <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Average ATAR Boost</h3>
            <p className="text-text-secondary">
              Students improve their ATAR by an average of 8.5 points with Velocita tutoring.
            </p>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-8">
            <div className="text-success-green text-3xl font-bold mb-4">95%</div>
            <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">University Placement</h3>
            <p className="text-text-secondary">
              95% of our students secure placement in their preferred university course.
            </p>
          </div>
          <div className="bg-cards border border-card-border rounded-lg p-8">
            <div className="text-gold-cta text-3xl font-bold mb-4">500+</div>
            <h3 className="text-xl font-playfair font-semibold text-text-primary mb-3">Success Stories</h3>
            <p className="text-text-secondary">
              Over 500 VCE students have achieved their academic goals with our help.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-playfair font-bold text-text-primary mb-8">How Velocita Works</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-cards border border-card-border rounded-lg p-6">
              <div className="bg-gold-cta text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
              <h4 className="font-semibold text-text-primary mb-2">Free Diagnostic</h4>
              <p className="text-text-secondary text-sm">Take our comprehensive ATAR assessment</p>
            </div>
            <div className="bg-cards border border-card-border rounded-lg p-6">
              <div className="bg-gold-cta text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
              <h4 className="font-semibold text-text-primary mb-2">Personalized Plan</h4>
              <p className="text-text-secondary text-sm">Get a custom study strategy based on your results</p>
            </div>
            <div className="bg-cards border border-card-border rounded-lg p-6">
              <div className="bg-gold-cta text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
              <h4 className="font-semibold text-text-primary mb-2">Expert Tutoring</h4>
              <p className="text-text-secondary text-sm">Work with specialist VCE tutors</p>
            </div>
            <div className="bg-cards border border-card-border rounded-lg p-6">
              <div className="bg-gold-cta text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">4</div>
              <h4 className="font-semibold text-text-primary mb-2">ATAR Success</h4>
              <p className="text-text-secondary text-sm">Achieve your target ATAR and university goals</p>
            </div>
          </div>
        </div>

        <div className="bg-cards border border-card-border rounded-lg p-8 text-center">
          <h3 className="text-3xl font-playfair font-bold text-text-primary mb-4">Ready to Transform Your VCE Journey?</h3>
          <p className="text-text-secondary mb-6">Join hundreds of Melbourne students achieving their ATAR goals with Velocita</p>
          <a 
            href="/diagnostic" 
            className="inline-block bg-gold-cta hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            Start Your Free Assessment
          </a>
        </div>
      </main>

      <footer className="bg-cards border-t border-card-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-text-secondary">
            © 2024 Velocita - Premium VCE Tutoring Melbourne
          </p>
        </div>
      </footer>
    </div>
  );
}
