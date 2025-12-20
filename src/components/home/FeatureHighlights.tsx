import { Headphones, Truck, Shield } from 'lucide-react';

export default function FeatureHighlights() {
  const features = [
    {
      icon: Headphones,
      title: '24 x 7 Support',
      description: 'Always here to help',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over £50',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% protected',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="bg-primary-100 p-4 rounded-full">
                <feature.icon size={32} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
