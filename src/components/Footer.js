import React from "react";

function Footer() {
  return (
    <footer
      style={{
        padding: "20px",
        textAlign: "center",
        fontSize: "14px",
        color: "#6c757d",
        marginTop: "100px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/stacked-blue-3c7b4b7b4f6d2c6c7b4b4c2e6c6c7b4b7b4b4c2e6c6c7b4b.svg"
            alt="TMDB Logo"
            style={{ height: "40px" }}
          />
        </a>
      </div>
      <p>
        이 웹사이트는 <strong>TMDB API</strong>를 사용하여 데이터를 제공합니다.
        해당 API는{" "}
        <a
          href="https://www.themoviedb.org/documentation/api"
          target="_blank"
          rel="noopener noreferrer"
        >
          TMDB API
        </a>
        에서 제공되며, 이 웹사이트는 TMDB의 공식 인증 또는 보증을 받지
        않았습니다.
      </p>
      <p>
        TMDB 및 관련 콘텐츠의 저작권은{" "}
        <strong>The Movie Database (TMDB)</strong>에 있습니다.
      </p>
      <p>
        이 웹사이트는 비상업적 목적으로 제작되었으며, TMDB의 저작권과 정책을
        존중합니다. 모든 콘텐츠는 교육적 또는 개인적 용도로만 사용됩니다.
      </p>
      <p style={{ marginTop: "10px" }}>
        © 2025 영화/드라마 정보 사이트. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
