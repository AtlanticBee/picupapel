# Contents Table Styling Explained

The styling of the contents table is interesting.
I developed it to consist of three sections:
- The Description Definition (dd) element for the name of the section
- An SVG dashed line (inserted as an img element) connecting the dd to the dt
- A Description Text (dt) element

This on its own is fine, but raises the issue of responsive styling.
Through pure chance, I ended up with a setup that works quite nicely, but it's not immediately obvious to me why.

Having now worked through it, here is the process by which the browser renders the contents table...

## Browser logic

The browser renders everything in a ONE PASS approach. Using a specific order of priorities, it will only look at each part of the process once: it DOES NOT for example try expanding an element and then readjusting text again

- Text takes priority. It assembles the entire line of DD, SVG and DT on a page of infinite width:
    - The DT and DD get an initial width that is equal to the characters and their size in pixels plus, no wrapping
    - The SVG gets an initial height of 2px (we specified it) and then the "60" width is interpreted as 60 * 2 = 120px wide
    - Key point: underneath, all elements have a min-width of AUTO which means this 120px is actually a hard lower limit. If you wanted the line to be able to shrink to nothing, you'd need to set it explicitly to min-width: 0
    - As usual, we would also include any margins and padding
- Next, it identifies that the text spills over our set max width of 60rem
- Again, text takes priority here. We set the DT element to permit wrapping by not enforcing "nowrap" so it find the last whitespace where it can safely break the line into two linesto reduce the DD making sure to keep:
    - The DD element at the correct width (can't wrap)
    - The SVG to a minimum of 120px

Key takeaways:
- There are default minimum widths (in this case, the SVG's is a mininum 1:1 ratio of the width to height in px)
- Flex is applied after text adjustments - text engine takes priority
- In cases where you "force" the system (e.g. give it a long unbroken word) it will eventually overspill - it cannot find a solution and it has not been permitted to break words, so it spills over your given boundary (or even, the screen)