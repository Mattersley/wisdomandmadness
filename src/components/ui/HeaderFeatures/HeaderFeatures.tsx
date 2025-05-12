import IconWithCaption from '@/components/ui/IconWithCaption/IconWithCaption'

const HeaderFeatures = () => (
  <div className="grid grid-cols-8 gap-2 gap-y-10">
    <IconWithCaption
      caption="Client focussed"
      iconPaths={
        <>
          <path d="M6 10a7 7 0 1 1 13 3.6a10 10 0 0 1 -2 2a8 8 0 0 0 -2 3a4.5 4.5 0 0 1 -6.8 1.4"></path>
          <path d="M10 10a3 3 0 1 1 5 2.2"></path>
        </>
      }
    />

    <IconWithCaption
      caption="Mobile-first"
      iconPaths={
        <>
          <path d="M11.5 21h-3.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v6"></path>
          <path d="M11 4h2"></path>
          <path d="M18 22l3.35 -3.284a2.143 2.143 0 0 0 .005 -3.071a2.242 2.242 0 0 0 -3.129 -.006l-.224 .22l-.223 -.22a2.242 2.242 0 0 0 -3.128 -.006a2.143 2.143 0 0 0 -.006 3.071l3.355 3.296z"></path>
        </>
      }
    />
    
    <IconWithCaption
      caption="Accessible Design"
      iconPaths={
        <>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M10 16.5l2 -3l2 3m-2 -3v-2l3 -1m-6 0l3 1"></path>
            <circle cx="12" cy="7.5" fill="currentColor" r=".5"></circle>
        </>
      }
    />

    <IconWithCaption
      caption="Scoring"
      iconPaths={
        <>
            <path d="M12 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            <path d="M10 7h4"></path>
            <path d="M10 18v4l2 -1l2 1v-4"></path>
            <path d="M10 19h-2a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2"></path>
        </>
      }
    />

    <IconWithCaption
      caption="Support"
      iconPaths={
        <>
            <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
            <path d="M9.5 9h.01"></path>
            <path d="M14.5 9h.01"></path>
            <path d="M9.5 13a3.5 3.5 0 0 0 5 0"></path>
        </>
      }
    />
    
    <IconWithCaption
      caption="Canadian"
      iconPaths={
        <>
          <path d="M11.9.38l-3.08,3.6-2.73-.65,1.73,6.94" />
          <path d="M11.9.38l3.08,3.6,2.72-.65-1.73,6.92" />
          <path d="M6.82,17.6L.38,13.69l1.73-1.05-.3-3.45,3.45.3,1.05-1.73,1.52,2.5" />
          <path d="M15.97,10.25l1.51-2.49,1.05,1.73,3.45-.3-.3,3.45,1.73,1.05-6.44,3.91" />
          <path d="M16.97,17.6l.74,2.41-5.82-1.56-5.82,1.56.74-2.41" />
          <path d="M11.9,12.74v11.64" />
        </>
      }
    />
    <IconWithCaption
      caption="F&B expertise"
      iconPaths={
        <>
          <path d="M4 11h16a1 1 0 0 1 1 1v.5c0 1.5 -2.517 5.573 -4 6.5v1a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-1c-1.687 -1.054 -4 -5 -4 -6.5v-.5a1 1 0 0 1 1 -1z"></path>
          <path d="M12 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
          <path d="M16 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
          <path d="M8 4a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2"></path>
        </>
      }
    />
  </div>
)

export default HeaderFeatures
