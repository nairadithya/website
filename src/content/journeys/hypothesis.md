---
title: Doing My Maths Assignments In Julia
description: Trying to replicate my maths assignment with Julia.
date: 2025-04-01
isDraft: false
---

I'm really excited about Julia, and I want to use it as much as possible. In my university, the preferred language of choice for scientific and mathematical computing is MATLAB. This is a piece of software I absolutely loathe. It takes really long to startup, doesn't work well on Linux and it's got all sorts of licensing issues that randomly cause it to break.

I do use Octave in the labs simply because it's a good enough in-between.

With this, I set out to recreate my probability practice sheet with Julia alone.

# Probability Distributions And Testing Hypothesis

> A robotics company is testing two models of autonomous warehouse robots: Model A and Model B. The company wants to determine whether Model A hs a higher success rate in navigating warehouse obstacles than Model B.
> - Model A: Out of 150 tests, 135 were successful
> - Model B: Out of 180 test, 144 were suffessfull

To go about computing this in Matlab.

```matlab
n1 = 150;
n2 = 180;
x1 = 135;
x2 = 144;
alpha = 0.02;
p = (x1 + x2)/(n1 + n2);
c = icdf('norm',1-alpha, 0,1);

z0 = (x1/n1 - x2/n2)/(sqrt(p*(1-p)*(1/n1 + 1/n2)))
```

To do the same in Julia,

```julia
using Random, Distributions
n1 = 150;
n2 = 180;
x1 = 135;
x2 = 144;
alpha = 0.02;
p = (x1 + x2)/(n1 + n2);
d = Normal();
z = quantile(d,1-alpha)
```

# Clustering

# Fourier Transforms
