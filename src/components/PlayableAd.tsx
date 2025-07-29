"use client"

interface PlayableAdProps {
  title: string;
  description: string;
  adPath: string;
}

export default function PlayableAd({ title, description, adPath }: PlayableAdProps) {
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="w-full h-96 border rounded overflow-hidden">
        <iframe
          src={adPath}
          className="w-full h-full"
          title={title}
          frameBorder="0"
          allow="autoplay; fullscreen; gamepad"
        />
      </div>
    </div>
  )
}