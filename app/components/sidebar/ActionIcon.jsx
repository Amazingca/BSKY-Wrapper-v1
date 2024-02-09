const ActionIcon = ({Icon, mainColor="--action-icon-primary", backgroundColor="--action-icon-background", hover={}}) => {

    const GradientPaintbrush = () => {

        return (
            <svg width="2rem" height="2rem" viewBox="0 0 2 2" style={{display: "block"}} fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.41254 0.16503C1.50134 0.100461 1.59217 0.045532 1.67589 0.0185117C1.75822 -0.008128 1.86148 -0.0153588 1.93836 0.0616427C2.01485 0.137883 2.01041 0.240636 1.98504 0.324234C1.95942 0.408974 1.90588 0.500564 1.84233 0.590124C1.71408 0.770767 1.5257 0.969043 1.36345 1.12913C1.22416 1.26665 1.09299 1.36242 0.977805 1.4209C0.989122 1.49466 0.982903 1.57004 0.959651 1.64094C0.936399 1.71184 0.896769 1.77627 0.843972 1.829C0.789297 1.88367 0.70887 1.91666 0.633772 1.93822C0.555882 1.96067 0.46962 1.97463 0.39097 1.98351C0.294758 1.99423 0.198037 1.99973 0.101231 2H0.0943807C0.0694765 1.99977 0.0455289 1.98978 0.0279064 1.97218C0.0102838 1.95458 0.000264585 1.93078 0 1.90587L0.0942539 1.90486L0.000126856 1.90575V1.8989C0.000417483 1.80209 0.00592254 1.70537 0.0166181 1.60916C0.0251175 1.52708 0.0403402 1.44589 0.0620325 1.36636C0.083598 1.29138 0.116581 1.21083 0.171129 1.15615C0.224015 1.10321 0.288659 1.0635 0.359795 1.04027C0.430932 1.01703 0.50655 1.01093 0.580492 1.02245C0.639607 0.909167 0.735891 0.780535 0.874037 0.644165C1.03527 0.484961 1.23342 0.295311 1.41254 0.16503ZM0.205633 1.63072C0.199164 1.68958 0.194724 1.74857 0.19244 1.80769C0.251555 1.8054 0.31067 1.80096 0.369531 1.79449C0.441004 1.78715 0.511766 1.77404 0.581127 1.7553C0.647853 1.73614 0.689715 1.71407 0.709378 1.6944C0.762906 1.64088 0.792978 1.56828 0.792978 1.49258C0.792978 1.41688 0.762906 1.34428 0.709378 1.29075C0.682874 1.26424 0.651408 1.24322 0.616779 1.22888C0.582149 1.21453 0.545033 1.20715 0.50755 1.20715C0.43185 1.20715 0.359251 1.23722 0.305723 1.29075C0.28606 1.31041 0.263987 1.35227 0.244832 1.41887C0.226075 1.48832 0.212966 1.55916 0.205633 1.63072ZM1.52443 0.319033C1.36916 0.431935 1.19397 0.596721 1.03958 0.748313L1.25752 0.966252C1.41102 0.81339 1.57593 0.636807 1.68718 0.480013C1.74681 0.396035 1.78613 0.324361 1.80288 0.269179C1.81987 0.212855 1.80693 0.199281 1.80402 0.196237H1.80389V0.19611C1.80211 0.194334 1.78956 0.181775 1.73437 0.199535C1.67957 0.217295 1.60815 0.258142 1.52443 0.319033ZM0.911459 1.24077L0.911332 1.24089C0.984968 1.1997 1.05425 1.15117 1.11811 1.09603L0.90778 0.885698C0.851854 0.948442 0.802503 1.01675 0.760501 1.08956C0.821645 1.12787 0.873276 1.17962 0.911459 1.24077Z" fill="url(#paint0_linear_425_107)"/>
                <defs>
                    <linearGradient id="paint0_linear_425_107" x1="0" y1="0" x2="2" y2="2" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#0099FF" />
                        <stop offset="1" stopColor="#3B82F6" />
                    </linearGradient>
                </defs>
            </svg>
        )
    }

    return (
        <div style={{backgroundColor: `var(${backgroundColor})`}} className={`ActionIcon${(mainColor == "--primary-accent") ? " ComposeIcon": ""}`}>
            {(mainColor != "--primary-accent") ? <Icon size={"small"} fill={`var(${mainColor})`} /> : GradientPaintbrush()}
        </div>
    )
}

export default ActionIcon;