export let baseUrl: string;

export let setBaseUrls = ({ baseUrl: _baseUrl }: { baseUrl: string }) => {
  baseUrl = _baseUrl;
};
