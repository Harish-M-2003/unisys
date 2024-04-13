import { NextRequest , NextResponse } from "next/server";

export async function POST(req : NextRequest){

    const {message} = await req.json();

    const content =  `
    Sure, here's a short story:

Title: The Forgotten Symphony

In the heart of a bustling city, amidst the chaos of everyday life, there stood an old, forgotten theater. Its grandeur faded, its walls adorned with patches of peeling paint, and its once magnificent stage now adorned with dust and cobwebs.

Inside this theater, hidden from the world, lived an old man named Hector. He was the caretaker of this forgotten place, the last remaining soul who remembered its glory days. Every day, Hector would wander through the empty corridors, lost in memories of the past.

One evening, as Hector was dusting off an old piano, he heard a faint sound echoing through the theater. Surprised, he followed the melody, his heart pounding with anticipation. It led him to the grand stage, where he saw a young girl sitting at the piano, her fingers dancing across the keys with effortless grace.

Hector watched in awe as the girl played, her music filling the theater with a warmth it hadn't felt in years. It was as if the forgotten walls came alive once more, resonating with the beauty of her melody.

After she finished, the girl looked up and met Hector's gaze. "I'm sorry, I didn't mean to intrude," she said softly.

Hector smiled warmly. "No, my dear, you've brought life back to this old place. What's your name?"

"I'm Sofia," she replied. "I stumbled upon this theater by chance, but there's something magical about it."

Hector nodded, a spark of hope igniting within him. "Yes, there is magic here, Sofia. It's the magic of music and memories."

From that day on, Sofia and Hector became unlikely companions, spending their days reviving the theater together. With Sofia's talent and Hector's knowledge, they restored the old stage to its former glory.

Soon`

    return NextResponse.json({response : content})

}