const { useState } = React

export function LongTxt({ txt, length = 60 }) {

   //  const [isShowFullTxt, setIsShowFullTxt] = useState(false)

   //  function onToggleIsShowFullTxt() {
   //      setIsShowFullTxt(isShowFullTxt => !isShowFullTxt)
   //  }

    const isLongerThanLimit = txt.length > length
    const textToShow = (!isLongerThanLimit) ? txt : (txt.substring(0, length)) + '...'
    return (
        <section className="long-txt">
            <p className="txt">{textToShow}</p>
            {/* {isLongerThanLimit &&
                <div>
                    <button className="show-txt-btn" onClick={onToggleIsShowFullTxt}>
                        {isShowFullTxt ? 'Show Less' : 'Read More'}
                    </button>
                </div>
            } */}
        </section>
    );
}